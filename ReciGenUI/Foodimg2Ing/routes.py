from flask import render_template ,url_for,flash,redirect,request
from Foodimg2Ing import app
from Foodimg2Ing.output import output
import os
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'images', 'demo_imgs')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/',methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/about',methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        if 'imagefile' not in request.files:
            return "Error: No file uploaded!"

        imagefile = request.files['imagefile']

        if imagefile.filename == '':
            return "Error: No selected file!"

        # Secure the filename (avoid path traversal attacks)
        filename = os.path.basename(imagefile.filename)

        # Save the file in the correct folder
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        imagefile.save(image_path)

        # Relative path for displaying in HTML
        img_url = url_for('static', filename=f'images/demo_imgs/{filename}')

        # Ensure `output()` function is defined
        title, ingredients, recipe = output(image_path)

        return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img_url)

@app.route('/<samplefoodname>')
def predictsample(samplefoodname):
    imagefile=os.path.join(app.root_path,'static/images',str(samplefoodname)+".jpg")
    print(imagefile)
    img="/images/"+str(samplefoodname)+".jpg"
    title,ingredients,recipe = output(imagefile)
    return render_template('predict.html',title=title,ingredients=ingredients,recipe=recipe,img=img)