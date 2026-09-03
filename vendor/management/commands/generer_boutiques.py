"""
Commande Django : génère des boutiques de démonstration avec leurs produits.

Usage :
    python manage.py generer_boutiques [--nb N]

Dépendances : aucune.
"""
import random

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from vendor.models import Vendeur, Produit, Categorie

# Boutiques de démonstration : nom, prénom, email, produits (nom, prix, description, image)
BOUTIQUES = [
    {
        "first_name": "Awa",
        "last_name": "Diabaté",
        "email": "boutique.awa@demo.local",
        "produits": [
            ("Robe en soie élégante", 25000, "Robe légère et raffinée pour toutes les occasions.", "https://picsum.photos/seed/robe/400/400"),
            ("Sac à main cuir", 65000, "Sac à main en cuir véritable, finition soignée.", "https://picsum.photos/seed/sac/400/400"),
            ("Sandales tendance", 18000, "Sandales confortables et stylées.", "https://picsum.photos/seed/sandales/400/400"),
        ],
    },
    {
        "first_name": "Moussa",
        "last_name": "Traoré",
        "email": "boutique.moussa@demo.local",
        "produits": [
            ("Casque Bluetooth Pro", 45000, "Casque sans fil avec réduction de bruit.", "https://picsum.photos/seed/casque/400/400"),
            ("Enceinte portable", 35000, "Enceinte Bluetooth puissante et compacte.", "https://picsum.photos/seed/enceinte/400/400"),
            ("Montre connectée", 89000, "Montre intelligente avec suivi d'activité.", "https://picsum.photos/seed/montre/400/400"),
        ],
    },
    {
        "first_name": "Fatou",
        "last_name": "Ndiaye",
        "email": "boutique.fatou@demo.local",
        "produits": [
            ("Crème hydratante naturelle", 12000, "Crème à base d'ingrédients naturels.", "https://picsum.photos/seed/creme/400/400"),
            ("Huile de karité pure", 8000, "Huile de karité 100% naturelle.", "https://picsum.photos/seed/huile/400/400"),
            ("Savon artisanal", 5000, "Savon fait main, doux pour la peau.", "https://picsum.photos/seed/savon/400/400"),
        ],
    },
    {
        "first_name": "Ibrahim",
        "last_name": "Koné",
        "email": "boutique.ibrahim@demo.local",
        "produits": [
            ("Tapis de yoga", 15000, "Tapis antidérapant pour vos séances.", "https://picsum.photos/seed/tapis/400/400"),
            ("Haltères réglables", 30000, "Haltères pour musculation à domicile.", "https://picsum.photos/seed/halteres/400/400"),
            ("Bouteille sportive", 7000, "Bouteille isotherme pour le sport.", "https://picsum.photos/seed/bouteille/400/400"),
        ],
    },
]


class Command(BaseCommand):
    help = "Génère des boutiques de démonstration avec leurs produits."

    def add_arguments(self, parser):
        parser.add_argument("--nb", type=int, default=4, help="Nombre de boutiques à générer.")

    def handle(self, *args, **options):
        nb = options["nb"]
        boutiques = BOUTIQUES[:nb]

        # Catégorie générique si aucune n'existe
        categorie, _ = Categorie.objects.get_or_create(
            name="general",
            defaults={"description": "Produits génériques"},
        )

        created_boutiques = 0
        created_produits = 0

        for b in boutiques:
            vendeur, was_created = Vendeur.objects.get_or_create(
                email=b["email"],
                defaults={
                    "first_name": b["first_name"],
                    "last_name": b["last_name"],
                    "password": "demo-password",
                },
            )
            if was_created:
                created_boutiques += 1

            for nom, prix, desc, image in b["produits"]:
                produit, p_created = Produit.objects.get_or_create(
                    name=nom,
                    defaults={
                        "description": desc,
                        "price": prix,
                        "stock": random.randint(5, 60),
                        "image": image,
                        "slug": slugify(nom)[:50] or "produit",
                        "vendeur": vendeur,
                        "categorie": categorie,
                    },
                )
                if p_created:
                    created_produits += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Génération terminée : {created_boutiques} boutique(s) créée(s), "
                f"{created_produits} produit(s) créé(s)."
            )
        )