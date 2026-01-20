from PIL import Image
import collections

# The user uploaded the image to the artifacts directory
image_path = r"C:\Users\ddubi\.gemini\antigravity\brain\0d1e9def-dcf4-4f89-b960-1e9bfa3be081\uploaded_image_1768943599438.png"

try:
    img = Image.open(image_path).convert('RGB')
    width, height = img.size
    print(f"Image Size: {width}x{height}")

    # We can simple sample along the horizontal center line
    # The image has 5 distinct color blocks horizontally.
    
    y = height // 2
    
    # Sample 5 points evenly spaced
    # 1. 10% (Beige)
    # 2. 55% (Salmon - it starts after 50% visually?)
    # 3. 71% (Pink strip)
    # 4. 76% (Red strip)
    # 5. 90% (Navy)
    
    # Let's just sample every 10 pixels and print unique colors to be sure
    # Or just count prevalent colors
    
    pixels = list(img.getdata())
    # Count most common
    common = collections.Counter(pixels).most_common(10)
    
    hex_colors = []
    for color, count in common:
         hex_colors.append('#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2]))
         
    print("Dominant Colors:", hex_colors)
    
except Exception as e:
    print(f"Error: {e}")
