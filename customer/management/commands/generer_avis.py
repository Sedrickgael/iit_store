"""
Commande Django : génère des avis de démonstration sur les produits.

Usage :
    python manage.py generer_avis [--produits N] [--par-produit N]

Dépendances : aucune.
"""
import random

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from vendor.models import Produit
from customer.models.avis import Avis

Profil = get_user_model()

COMMENTAIRES = [
    "Très bon produit, conforme à la description. Je recommande.",
    "Qualité au rendez-vous, livraison rapide. Satisfait de mon achat.",
    "Produit conforme, emballage soigné. Merci au vendeur.",
    "Excellent rapport qualité-prix. Je rachèterai.",
    "Bon produit dans l'ensemble, quelques petits défauts mais acceptable.",
    "Très satisfait, je recommande ce vendeur.",
    "Produit de bonne qualité, conforme aux photos.",
    "Livraison rapide et produit conforme. Très content.",
    "Je recommande vivement, service client réactif.",
    "Bon achat, le produit correspond bien à mes attentes.",
]


class Command(BaseCommand):
    help = "Génère des avis de démonstration sur les produits."

    def add_arguments(self, parser):
        parser.add_argument("--produits", type=int, default=10, help="Nombre de produits à noter.")
        parser.add_argument("--par-produit", type=int, default=3, help="Nombre d'avis par produit.")

    def handle(self, *args, **options):
        nb_produits = options["produits"]
        nb_par_produit = options["par_produit"]

        produits = list(Produit.objects.filter(active=True)[:nb_produits])
        if not produits:
            self.stderr.write(self.style.ERROR("Aucun produit trouvé."))
            return

        # Créer (ou retrouver) des profils de démonstration
        profils = []
        for i in range(1, 6):
            email = f"client{i}@demo.local"
            profil, _ = Profil.objects.get_or_create(
                email=email,
                defaults={
                    "username": f"client{i}",
                    "first_name": f"Client",
                    "last_name": f"Numéro {i}",
                    "role": "client",
                },
            )
            profils.append(profil)

        created = 0
        skipped = 0
        for produit in produits:
            nb = random.randint(1, nb_par_produit)
            for _ in range(nb):
                profil = random.choice(profils)
                note = random.randint(3, 5)
                commentaire = random.choice(COMMENTAIRES)
                _, was_created = Avis.objects.get_or_create(
                    profil=profil,
                    product=produit,
                    defaults={
                        "note": note,
                        "commentaire": commentaire,
                        "is_approved": True,
                    },
                )
                if was_created:
                    created += 1
                else:
                    skipped += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Génération terminée : {created} avis créé(s), {skipped} ignoré(s)."
            )
        )