var queryString = Math.random(); 
var ss = SpreadsheetApp.getActiveSpreadsheet(); 

var ssRates = ss.getSheetByName('Kur'); 
var targetCurrency = 'try' // Tüm CoinMarketCap verilerini alıyoruz. 
if (typeof targetCurrency == 'undefined' || targetCurrency == '') {targetCurrency = 'usd'};
var coins = getCoins(); function getData() { 
var myCoins = [ 'XLM', 'BTC', 'BCH', 'ETH', 'XRB', 'XMR', ]  
ssRates.getRange('A1').setValue("ID"); ssRates.getRange('B1').setValue("Koin"); ssRates.getRange('C1').setValue("Sembol"); ssRates.getRange('D1').setValue("Sıra"); ssRates.getRange('E1').setValue("Fiyat USD"); ssRates.getRange('F1').setValue("Fiyat BTC"); ssRates.getRange('G1').setValue("24S Hacim USD"); ssRates.getRange('H1').setValue("Pazar Payı USD"); ssRates.getRange('I1').setValue("Uygun Arz"); ssRates.getRange('J1').setValue("Toplam Arz"); ssRates.getRange('K1').setValue("Maksimum Arz"); ssRates.getRange('L1').setValue("Değişim Oranı 1S"); ssRates.getRange('M1').setValue("Değişim Oranı 24S "); ssRates.getRange('N1').setValue("Değişim Oranı 7G"); ssRates.getRange('O1').setValue("Son Güncelleme"); // USD harici para birimi seçildiyse ekstra sütun ekliyoruz. 
if (typeof targetCurrency !== 'usd') { ssRates.getRange('P1').setValue("Fiyat " + targetCurrency.toUpperCase()); ssRates.getRange('Q1').setValue("24S Hacim " + targetCurrency.toUpperCase()); ssRates.getRange('R1').setValue("Pazar Payı " + targetCurrency.toUpperCase()); }; // Yeni bir obje oluşturuyoruz. // Her objenin anahtarı koinin sembolü olacak. 
var myCoinsObj = {}; 
var myCoinsCount = myCoins.length; 
for (var i = 0; i < myCoinsCount; i++) { 
  var n = 0; while (coins[n]['symbol'] !== myCoins[i]) { n++; } 
  myCoinsObj[coins[n]['symbol']] = coins[n]; 
  ssRates.getRange('A'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['id']); 
  ssRates.getRange('B'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['name']);
  ssRates.getRange('C'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['symbol']); 
  ssRates.getRange('D'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['rank']); 
  ssRates.getRange('E'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_usd']); 
  ssRates.getRange('F'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_btc']); 
  ssRates.getRange('G'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_usd']);
  ssRates.getRange('H'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_usd']); 
  ssRates.getRange('I'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['available_supply']);
  ssRates.getRange('J'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['total_supply']); 
  ssRates.getRange('K'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['max_supply']); 
  ssRates.getRange('L'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_1h']); 
  ssRates.getRange('M'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_24h']);
  ssRates.getRange('N'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_7d']); 
  
  ssRates.getRange('O'+(i+2).toString()).setValue(Utilities.formatDate(new Date(), "Turkey/Istanbul", "yyyy-MM-dd hh:mm:ss"));
  if (typeof targetCurrency !== 'usd') { ssRates.getRange('P'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_' + targetCurrency]); ssRates.getRange('Q'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_' + targetCurrency]); ssRates.getRange('R'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_' + targetCurrency]); }; } } // // AŞAĞIDAKI KISIMLARA DOKUNMAYIN // SİHRİN GERÇEKLEŞTİĞİ YER BURASI // 
function getCoins() { var url = 'https://api.coinmarketcap.com/v1/ticker/?convert=' + targetCurrency + '&limit=0?'; var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true}); var json = response.getContentText(); var data = JSON.parse(json); return data; } function getEthBalance(ethApiKey,ethAddress) { var obj = JSON.parse (UrlFetchApp.fetch("https://api.etherscan.io/api?module=account&action=balance&address="+ethAddress+"&tag=latest&apikey="+ethApiKey)); var data = (obj.result); return data * Math.pow(10,-18); } function getVtcBalance(vtcAddress) { var obj = UrlFetchApp.fetch("http://explorer.vertcoin.info/ext/getbalance/"+vtcAddress); return obj; } function getRate(currencyId) { if (typeof targetCurrency !== 'undefined') {conversionRate = 'usd'}; var url = 'https://api.coinmarketcap.com/v1/ticker/' + currencyId + '/?convert=' + targetCurrency; var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true}); var json = response.getContentText(); var data = JSON.parse(json); var obj = parseFloat(data[0]['price_' + targetCurrency]); return obj; } function getWebRate(currencyId) { //Örnek çıktı: // '=IMPORTXML("https://coinmarketcap.com/currencies/zeeyx?3908288283","//span[@id=\'quote_price\']")'; 
var coinScrape1 = '=IMPORTXML("https://coinmarketcap.com/currencies/'; var coinScrape2 = '","//span[@id=\'quote_price\']")'; return coinScrape1 + currencyId + '?' + queryString + coinScrape2; } 
