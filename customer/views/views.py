from rest_framework import generics, permissions
from customer.serializers.inscription import InscriptionSerializer, ProfilSerializer
from customer.models.profil import Profil


class InscriptionView(generics.CreateAPIView):
    """
    Crée un nouveau compte client (inscription publique).
    """
    queryset = Profil.objects.all()
    serializer_class = InscriptionSerializer
    permission_classes = [permissions.AllowAny]


class ProfilView(generics.RetrieveUpdateAPIView):
    """
    Affiche et modifie le profil de l'utilisateur authentifié.
    """
    serializer_class = ProfilSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
