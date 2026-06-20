def is_admin(user):
    return user.is_superuser or user.groups.filter(name='Administrateur').exists()

def is_entreprise(user):
    return user.groups.filter(name='Entreprise').exists()

def is_utilisateur(user):
    return user.groups.filter(name='Utilisateur').exists()

def allowed_groups_for_creator(user):
    if is_admin(user):
        return ['Administrateur', 'Entreprise', 'Utilisateur']
    if is_entreprise(user):
        return ['Utilisateur']
    return []