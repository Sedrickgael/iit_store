def color_from_string(value):
    return "#{:06x}".format(abs(hash(value)) % 0xFFFFFF)