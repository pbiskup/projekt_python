import requests
import pandas as pd
import matplotlib.pyplot as plt


url = "http://api.nbp.pl/api/exchangerates/rates/A/EUR/last/180/"
response = requests.get(url)
data = response.json()


df = pd.DataFrame(data["rates"])
df["effectiveDate"] = pd.to_datetime(df["effectiveDate"])
df.set_index("effectiveDate", inplace=True)
df.sort_index(inplace=True)


plt.figure(figsize=(12, 6))
plt.plot(df.index, df["mid"])
plt.title("Kurs Euro (EUR) - Ostatnie 180 dni")
plt.xlabel("Data")
plt.ylabel("Kurs średni")
plt.grid(True)
plt.show()
