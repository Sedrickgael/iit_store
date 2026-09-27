"""
Commande Django : ajoute un vendeur, des catégories et des produits d'exemple.

Usage :
    python manage.py ajouter_produits [--reset]

Dépendances : aucune.
"""
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from vendor.models import Vendeur, Produit, Categorie

# Vendeur de démonstration
VENDEUR = {
    "last_name": "Diallo",
    "first_name": "Aminata",
    "email": "boutique.aminata@demo.local",
    "password": "demo-password",
}

# Catégories et produits d'exemple
# Chaque produit : (nom, prix, stock, description, image)
CATEGORIES = [
    {
        "name": "Vêtements",
        "description": "Vêtements et accessoires de mode.",
        "produits": [
            ("Robe en soie élégante", 25000, 20, "Robe légère et raffinée pour toutes les occasions.", "https://picsum.photos/seed/robe/400/400"),
            ("Chemise en coton", 15000, 35, "Chemise confortable en coton bio.", "https://picsum.photos/seed/chemise/400/400"),
            ("Jean slim", 22000, 25, "Jean coupe slim, denim de qualité.", "https://picsum.photos/seed/jean/400/400"),
        ],
    },
    {
        "name": "Électronique",
        "description": "Appareils électroniques et accessoires.",
        "produits": [
            ("Casque Bluetooth Pro", 45000, 15, "Casque sans fil avec réduction de bruit.", "https://picsum.photos/seed/casque/400/400"),
            ("Enceinte portable", 35000, 18, "Enceinte Bluetooth puissante et compacte.", "https://picsum.photos/seed/enceinte/400/400"),
            ("Montre connectée", 89000, 10, "Montre intelligente avec suivi d'activité.", "https://picsum.photos/seed/montre/400/400"),
        ],
    },
    {
        "name": "Beauté",
        "description": "Produits de beauté et soins naturels.",
        "produits": [
            ("Crème hydratante naturelle", 12000, 40, "Crème à base d'ingrédients naturels.", "https://picsum.photos/seed/creme/400/400"),
            ("Huile de karité pure", 8000, 50, "Huile de karité 100% naturelle.", "https://picsum.photos/seed/huile/400/400"),
            ("Savon artisanal", 5000, 60, "Savon fait main, doux pour la peau.", "https://picsum.photos/seed/savon/400/400"),
        ],
    },
    {
        "name": "Sport",
        "description": "Équipement et accessoires de sport.",
        "produits": [
            ("Tapis de yoga", 15000, 30, "Tapis antidérapant pour vos séances.", "https://picsum.photos/seed/tapis/400/400"),
            ("Haltères réglables", 30000, 12, "Haltères pour musculation à domicile.", "https://picsum.photos/seed/halteres/400/400"),
            ("Bouteille sportive", 7000, 45, "Bouteille isotherme pour le sport.", "https://picsum.photos/seed/bouteille/400/400"),
        ],
    },
]


class Command(BaseCommand):
    help = "Ajoute un vendeur, des catégories et des produits d'exemple."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Supprime les produits existants avant d'ajouter.",
        )

    def handle(self, *args, **options):
        if options.get("reset"):
            Produit.objects.all().delete()
            self.stdout.write(self.style.WARNING("Produits existants supprimés."))

        # Créer (ou retrouver) le vendeur
        vendeur, _ = Vendeur.objects.get_or_create(
            email=VENDEUR["email"],
            defaults=VENDEUR,
        )
        self.stdout.write(f"Vendeur : {vendeur}")

        created = 0
        skipped = 0

        for cat in CATEGORIES:
            categorie, _ = Categorie.objects.get_or_create(
                name=cat["name"],
                defaults={"description": cat["description"]},
            )
            self.stdout.write(f"Catégorie : {categorie.name}")

            for nom, prix, stock, description, image in cat["produits"]:
                produit, was_created = Produit.objects.get_or_create(
                    name=nom,
                    defaults={
                        "description": description,
                        "price": prix,
                        "stock": stock,
                        "image": image,
                        "slug": slugify(nom)[:50] or "produit",
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
                f"Terminé : {created} produit(s) créé(s), {skipped} déjà présent(s)."
            )
        )