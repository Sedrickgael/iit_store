import os
import django
import random
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iit_store.settings')
django.setup()

from faker import Faker
from django.contrib.auth import get_user_model
from vendor.models.categorie import Categorie
from vendor.models.etiquette import Etiquette
from vendor.models.boutique import Boutique
from vendor.models.produit import Produit
from customer.models.profil import Profil
from customer.models.adresse import Adresse
from customer.models.avis import Avis
from customer.models.favoris import Favoris
from customer.models.moyen_de_paiement import MoyenPaiementModel
from customer.models.paiement import PaiementModel
from store.models.mode_de_reglement import ModeDeReglement
from store.models.commande import Commande
from store.models.ligne_de_commande import LigneCommande
from store.models.panier import Panier
from store.models.ligne_panier import PanierItem

fake = Faker('fr_FR')
User = get_user_model()

print("Nettoyage des données existantes...")
PanierItem.objects.all().delete()
Panier.objects.all().delete()
LigneCommande.objects.all().delete()
Commande.objects.all().delete()
PaiementModel.objects.all().delete()
MoyenPaiementModel.objects.all().delete()
Favoris.objects.all().delete()
Avis.objects.all().delete()
Adresse.objects.all().delete()
Produit.objects.all().delete()
Boutique.objects.all().delete()
Etiquette.objects.all().delete()
Categorie.objects.all().delete()
ModeDeReglement.objects.all().delete()
User.objects.filter(is_superuser=False).delete()



# ── Noms de produits par catégorie ──────────────────────────────────────────
produits_par_categorie = {
    "Électronique": ["iPhone 15 Pro", "Samsung Galaxy S24", "MacBook Air M2", "AirPods Pro", "iPad Mini", "Disque SSD 1To", "Souris Logitech MX", "Clavier mécanique", "Écran 4K 27 pouces", "Chargeur USB-C 65W"],
    "Vêtements": ["T-shirt col rond blanc", "Jean slim bleu", "Veste en cuir noir", "Robe d'été fleurie", "Hoodie gris chiné", "Chemise Oxford bleu ciel", "Short de sport", "Manteau d'hiver", "Polo Ralph Lauren", "Sneakers blanches"],
    "Alimentation": ["Café arabica 1kg", "Huile d'olive extra vierge", "Chocolat noir 70%", "Miel naturel 500g", "Thé vert japonais", "Granola bio aux fruits", "Sauce piment maison", "Pâtes artisanales", "Jus de gingembre", "Beurre de cacahuète"],
    "Beauté": ["Crème hydratante SPF50", "Sérum vitamine C", "Shampoing kératine", "Parfum Oud intense", "Huile de coco bio", "Rouge à lèvres mat", "Fond de teint longue durée", "Masque cheveux réparateur", "Gel douche aloe vera", "Déodorant naturel"],
    "Sport": ["Tapis de yoga antidérapant", "Haltères 5kg la paire", "Corde à sauter pro", "Gants de boxe", "Bouteille isotherme 1L", "Bande de résistance", "Chaussures de running", "Sac de sport imperméable", "Montre GPS de sport", "Casque vélo certifié"],
    "Maison": ["Lampe de bureau LED", "Coussin décoratif velours", "Plante artificielle réaliste", "Cafetière à piston", "Set de casseroles inox", "Cadre photo 30x40", "Tapis de salon berbère", "Bougie parfumée soja", "Organisateur de bureau", "Miroir mural rond"],
}

commentaires_positifs = [
    "Très bon produit, je suis pleinement satisfait de mon achat. La qualité est au rendez-vous.",
    "Livraison rapide et produit conforme à la description. Je recommande vivement !",
    "Excellent rapport qualité-prix. Je l'utilise tous les jours et je n'ai aucune plainte.",
    "Produit de très bonne qualité, bien emballé. Correspond exactement à mes attentes.",
    "Je suis agréablement surpris par la qualité. N'hésitez pas à commander !",
]

commentaires_neutres = [
    "Produit correct dans l'ensemble, mais le délai de livraison était un peu long.",
    "Qualité correcte pour le prix. Pas extraordinaire mais fait le travail.",
    "Conforme à la description. Quelques petits défauts mineurs mais rien de grave.",
    "Produit moyen. Je m'attendais à mieux pour ce prix mais ça peut dépanner.",
]

commentaires_negatifs = [
    "Déçu par la qualité. Le produit ne correspond pas vraiment à la photo.",
    "Livraison trop longue et emballage abîmé. Service client peu réactif.",
    "Produit fragile, tombé en panne après quelques jours d'utilisation seulement.",
]

# ── 1. Users + Profils (le signal crée le Profil automatiquement) ──────────
print("Création des utilisateurs...")
users = []
for i in range(10):
    email = fake.unique.email()
    user = User.objects.create_user(
        username=fake.unique.user_name(),
        email=email,
        password="password123",
        first_name=fake.first_name(),
        last_name=fake.last_name(),
    )
    users.append(user)

profils = list(Profil.objects.filter(user__in=users))

for profil in profils:
    profil.genre = random.choice(['M', 'F'])
    profil.role = random.choice(['client', 'moderateur', 'visiteur'])
    profil.telephone = fake.phone_number()[:20]
    profil.date_naissance = fake.date_of_birth(minimum_age=18, maximum_age=60)
    profil.save()

print(f"  {len(profils)} profils créés.")

# ── 2. Adresses ────────────────────────────────────────────────────────────
print("Création des adresses...")
for profil in profils:
    for j in range(random.randint(1, 2)):
        Adresse.objects.create(
            profil=profil,
            type=random.choice(['domicile', 'bureau', 'autre']),
            street=fake.street_address(),
            is_default=(j == 0),
        )

# ── 3. Catégories ──────────────────────────────────────────────────────────
print("Création des catégories...")
noms_categories = ["Électronique", "Vêtements", "Alimentation", "Beauté", "Sport", "Maison"]
categories = [Categorie.objects.create(name=n, description=fake.sentence()) for n in noms_categories]

# ── 4. Étiquettes ──────────────────────────────────────────────────────────
print("Création des étiquettes...")
noms_etiquettes = ["Promo", "Nouveau", "Populaire", "Bio", "Premium", "Soldes"]
etiquettes = [Etiquette.objects.create(name=n, description=fake.sentence()) for n in noms_etiquettes]

# ── 5. Boutiques ───────────────────────────────────────────────────────────
print("Création des boutiques...")
boutiques = []
for profil in profils[:5]:
    b = Boutique.objects.create(
        profil=profil,
        name=fake.company(),
        address=fake.address(),
        email=fake.company_email(),
    )
    boutiques.append(b)

# ── 6. Produits ────────────────────────────────────────────────────────────
print("Création des produits...")
produits = []
for _ in range(30):
    boutique = random.choice(boutiques)
    categorie = random.choice(categories)
    noms = produits_par_categorie.get(categorie.name, ["Produit générique"])
    p = Produit.objects.create(
        name=random.choice(noms),
        description=fake.paragraph(),
        price=Decimal(str(round(random.uniform(500, 150000), 2))),
        boutique=boutique,
        categorie=categorie,
    )
    p.etiquette.set(random.sample(etiquettes, k=random.randint(1, 3)))
    produits.append(p)

# Rattacher produits aux boutiques (M2M)
for b in boutiques:
    b.produit_id.set(random.sample(produits, k=random.randint(3, 8)))

# ── 7. Modes de règlement ──────────────────────────────────────────────────
print("Création des modes de règlement...")
modes = [
    ModeDeReglement.objects.create(name="Carte bancaire", type="carte"),
    ModeDeReglement.objects.create(name="Mobile Money", type="mobile_money"),
    ModeDeReglement.objects.create(name="Espèces", type="especes"),
    ModeDeReglement.objects.create(name="Virement bancaire", type="virement"),
]

# ── 8. Commandes + Lignes de commande ──────────────────────────────────────
print("Création des commandes...")
commandes = []
for profil in profils:
    for _ in range(random.randint(1, 3)):
        cmd = Commande.objects.create(
            profil=profil,
            destination=fake.address(),
            statut=random.choice(['en_attente', 'confirmee', 'en_cours', 'livree', 'annulee']),
            mode_reglement=random.choice(modes),
        )
        commandes.append(cmd)
        produits_choisis = random.sample(produits, k=random.randint(1, 5))
        for prod in produits_choisis:
            LigneCommande.objects.create(
                order=cmd,
                product=prod,
                quantity=random.randint(1, 5),
                unit_price=prod.price,
            )

# ── 9. Paniers ─────────────────────────────────────────────────────────────
print("Création des paniers...")
for profil in profils:
    panier = Panier.objects.create(profil=profil)
    produits_panier = random.sample(produits, k=random.randint(1, 4))
    for prod in produits_panier:
        PanierItem.objects.create(
            cart=panier,
            product=prod,
            quantity=random.randint(1, 3),
        )

# ── 10. Avis ───────────────────────────────────────────────────────────────
print("Création des avis...")
paires_avis = set()
for _ in range(25):
    profil = random.choice(profils)
    produit = random.choice(produits)
    if (profil.id, produit.id) not in paires_avis:
        paires_avis.add((profil.id, produit.id))
        note = random.randint(1, 5)
        if note >= 4:
            commentaire = random.choice(commentaires_positifs)
        elif note == 3:
            commentaire = random.choice(commentaires_neutres)
        else:
            commentaire = random.choice(commentaires_negatifs)
        Avis.objects.create(
            profil=profil,
            product=produit,
            note=note,
            commentaire=commentaire,
            is_approved=random.choice([True, False]),
        )

# ── 11. Favoris ────────────────────────────────────────────────────────────
print("Création des favoris...")
paires_favoris = set()
for profil in profils:
    for prod in random.sample(produits, k=random.randint(2, 6)):
        if (profil.id, prod.id) not in paires_favoris:
            paires_favoris.add((profil.id, prod.id))
            Favoris.objects.create(profil=profil, product=prod)

# ── 12. Moyens de paiement ─────────────────────────────────────────────────
print("Création des moyens de paiement...")
for profil in profils:
    MoyenPaiementModel.objects.create(
        profil=profil,
        type=random.choice(modes),
        details=fake.bban(),
    )

# ── 13. Paiements ──────────────────────────────────────────────────────────
print("Création des paiements...")
for cmd in commandes:
    if random.random() > 0.3:
        PaiementModel.objects.create(
            profil=cmd.profil,
            commande=cmd,
            montant=Decimal(str(round(random.uniform(1000, 50000), 2))),
            statut=random.choice(['en_attente', 'valide', 'echoue']),
        )

print("\nSeed terminé !")
print(f"  Utilisateurs : {User.objects.filter(is_superuser=False).count()}")
print(f"  Profils      : {Profil.objects.count()}")
print(f"  Produits     : {Produit.objects.count()}")
print(f"  Commandes    : {Commande.objects.count()}")
print(f"  Paniers      : {Panier.objects.count()}")
print(f"  Avis         : {Avis.objects.count()}")
print(f"  Paiements    : {PaiementModel.objects.count()}")