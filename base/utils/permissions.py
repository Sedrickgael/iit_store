from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """Autorise uniquement les administrateurs."""

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", "") == "admin"
        )


class IsVendeur(permissions.BasePermission):
    """Autorise un vendeur ou un admin."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        role = getattr(request.user, "role", "")
        return bool(request.user.is_staff or role in ("admin", "vendeur"))


class IsClient(permissions.BasePermission):
    """Autorise un client, un vendeur ou un admin (utilisateur connecté)."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)


class IsProfilOwner(permissions.BasePermission):
    """Autorise uniquement le propriétaire du profil ou un admin."""

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if getattr(user, "role", "") == "admin" or user.is_staff:
            return True
        return getattr(obj, "profil", None) == user or obj == user