from flask import Flask, request, render_template
import requests
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import sqlite3

app = Flask(__name__)

def create_table():
    query = "DROP TABLE IF EXISTS user"
    cursor.execute(query)
    conn.commit()

    query = "CREATE TABLE user(login VARCHAR UNIQUE, haslo VARCHAR)"
    cursor.execute(query)
    conn.commit()

def add_user(login, haslo):
    query = "INSERT INTO user (login, haslo) VALUES (?, ?)"
    cursor.execute(query, (login, haslo))
    conn.commit()

def check_user(login, haslo):
    query = 'SELECT * FROM user WHERE login = ? AND haslo = ?'
    cursor.execute(query, (login, haslo))
    result = cursor.fetchone()
    conn.commit()
    print('[DEBUG][check] result:', result)
    return result

conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()

create_table()
add_user('admin', 'admin')

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def zaloguj():
    if check_user(request.form['username'], request.form['password']):
        waluty = ["EUR","GBP","CHF","USD","CAD","HUF","UAH","JPY","CZK","MXN"]
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
            plt.savefig(f'static/chart{w}.png')  

        return render_template('dashboard.html')
    else:
        error = 'Błędne dane logowania. Spróbuj ponownie.'
        return render_template('login.html', error=error)

if __name__ == '__main__':
    app.run()

cursor.close()
conn.close()
