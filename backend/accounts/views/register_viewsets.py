from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.serializers.register_serializer import RegisterSerializer


class RegisterView(APIView):
    """
    Vue d'inscription : crée un nouveau compte utilisateur.
    """

    def post(self, request):
        # 1. On met les données du client dans le serializer
        serializer = RegisterSerializer(data=request.data)

        # 2. On valide (toutes nos validate_* s'exécutent ici)
        if serializer.is_valid():
            # 3. On crée le user (create() s'exécute ici, avec le hash du mot de passe)
            serializer.save()
            # 4. On répond avec le user créé (password n'apparaît pas grâce à write_only)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # 5. Si la validation échoue, on renvoie les erreurs
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
