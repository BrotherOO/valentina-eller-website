from PIL import Image
from collections import Counter
import os

def get_palette(image_path, num_colors=5):
    try:
        img = Image.open(image_path)
        img = img.resize((150, 150)) # Resize for speed
        result = img.convert('P', palette=Image.ADAPTIVE, colors=num_colors)
        result.putalpha(0)
        colors = result.getcolors(150*150)
        hex_colors = []
        for count, col in colors:
            hex_colors.append('#{:02x}{:02x}{:02x}'.format(col[0], col[1], col[2]))
        return hex_colors
    except Exception as e:
        print(f"Error: {e}")
        return []

# The user uploaded the image to the artifacts directory
image_path = r"C:\Users\ddubi\.gemini\antigravity\brain\0d1e9def-dcf4-4f89-b960-1e9bfa3be081\uploaded_image_1768943599438.png"

colors = get_palette(image_path, num_colors=5)
# Print for the agent to see
print("Extracted Colors:", colors)
