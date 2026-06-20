from rest_framework.permissions import BasePermission
from base.helpers.group import is_admin, is_entreprise, is_utilisateur


class IsAdminEntrepriseOrUtilisateur(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return (
            user and user.is_authenticated and (
                is_admin(user) or
                is_entreprise(user) or
                is_utilisateur(user)
            )
        )
    

class CustomEntrepriseCreateUserAccess(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        if request.method in ['POST']:
            return is_entreprise(user)

        else:
            return False


class CustomAdminAccess(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        if is_admin(user):
            return True

        else:
            return False
    

class CustomIsOwnerOrSameEntrepriseOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if is_admin(user):
            return True

        if is_entreprise(user):
            return hasattr(obj, 'profil') and obj.profil.entreprise_id == user.profil.entreprise_id

        if is_utilisateur(user):
            return obj == user

        return False