from flask import Flask, render_template
import requests
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/dashboard', methods=['POST'])
def dashboard():
    
    waluty = ["EUR","GBP","CHF"]
    for w in waluty:
        url = f"http://api.nbp.pl/api/exchangerates/rates/A/{w}/last/180/"
        response = requests.get(url)
        data = response.json()

        
        df = pd.DataFrame(data["rates"])
        df["effectiveDate"] = pd.to_datetime(df["effectiveDate"])
        df.set_index("effectiveDate", inplace=True)
        df.sort_index(inplace=True)

        
        plt.figure(figsize=(12, 6))
        plt.plot(df.index, df["mid"])
        plt.title(f"Kurs waluty {w} - Ostatnie 180 dni")
        plt.xlabel("Data")
        plt.ylabel("Kurs średni")
        plt.grid(True)
        plt.savefig(f'main/static/chart{w}.png')  

    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run()
