from API.models import User
import json

nick = "FAJNY_NICK"
ph_number = "997998999"
lista = [5, 14, 32, 15, 16]

b = User(nick=nick, phone_number=ph_number, allergies=json.dump(lista))

b.save()
