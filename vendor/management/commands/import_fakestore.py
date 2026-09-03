"""
Commande Django : importe les produits de la Fake Store API.

Usage :
    python manage.py import_fakestore [--limit N] [--reset]

Dépendances : aucune (utilise urllib de la bibliothèque standard).
"""
import json
import random
import urllib.request

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from vendor.models import Produit, Categorie, Vendeur

FAKE_STORE_URL = "https://fakestoreapi.com/products"

# Vendeur utilisateur de démonstration pour les produits importés
DEMO_VENDEUR = {
    "last_name": "FakeStore",
    "first_name": "Demo",
    "email": "demo@fakestore.local",
    "password": "demo-password",
}


class Command(BaseCommand):
    help = "Importe les produits de la Fake Store API dans la base."

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, help="Nombre max de produits à importer.")
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Supprime les produits importés avant d'importer.",
        )

    def handle(self, *args, **options):
        limit = options.get("limit")
        reset = options.get("reset")

        if reset:
            Produit.objects.all().delete()
            self.stdout.write(self.style.WARNING("Produits existants supprimés."))

        # Créer (ou retrouver) le vendeur de démo
        vendeur, _ = Vendeur.objects.get_or_create(
            email=DEMO_VENDEUR["email"],
            defaults=DEMO_VENDEUR,
        )

        # Télécharger les produits
        self.stdout.write("Téléchargement depuis la Fake Store API...")
        req = urllib.request.Request(
            FAKE_STORE_URL,
            headers={"User-Agent": "Mozilla/5.0"},
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        except Exception as exc:  # pragma: no cover
            self.stderr.write(self.style.ERROR(f"Erreur de téléchargement : {exc}"))
            return

        if limit:
            data = data[:limit]

        created = 0
        skipped = 0
        for item in data:
            name = str(item.get("title") or "").strip()[:100]
            if not name:
                skipped += 1
                continue

            # Catégorie générique dérivée du slug Fake Store
            cat_name = str(item.get("category") or "general").strip()[:20]
            categorie, _ = Categorie.objects.get_or_create(
                name=cat_name,
                defaults={"description": f"Produits de la catégorie {cat_name}"},
            )

            try:
                price = float(item.get("price") or 0)
            except (TypeError, ValueError):
                price = 0

            produit, was_created = Produit.objects.get_or_create(
                name=name,
                defaults={
                    "description": str(item.get("description") or ""),
                    "price": price,
                    "stock": random.randint(5, 100),
                    "image": str(item.get("image") or ""),
                    "slug": slugify(name)[:50] or "produit",
                    "vendeur": vendeur,
                    "categorie": categorie,
                },
            )

            if was_created:
                created += 1
            else:
                skipped += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Import terminé : {created} créé(s), {skipped} ignoré(s)."
            )
        )