from flask import Flask, render_template, send_file
app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')


@app.route("/rbc")
def rbc():
    return render_template('rbc.html')

@app.route("/store")
def store():
    return render_template('store.html')

@app.route("/rent")
def rent():
    return render_template('rent.html')

if __name__ == '__main__':
    app.run(debug=True)