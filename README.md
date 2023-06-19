
# Energy Efficiency System

## Authors

- Purici Marius [@markus-17](https://github.com/markus-17)
- Moisei Liviu [@MoiseiLiviu](https://github.com/MoiseiLiviu)
- Gilca Constantina [@LadyConstantina](https://github.com/LadyConstantina)
- Babcinetchi Egor [@Egor0000](https://github.com/Egor0000)
- Covalevschi Andreea [@AndreeaCvl](https://github.com/AndreeaCvl)


## Introduction

EES is a system that predicts the efficiency of the solar panels in producing energy for the next 7 days. The system uses Machine Learning to forecast the energy production. 
## Dependencies

1. The server is written in Python 3.7
2. The real data from the invertor are saved on AWS cloud
3. The ML model used is from the facebook's kats library. The installation is not required for a working solution, but may be required for model retraining and forecasting past may 2024.
4. Dependent on the subscription at api.weatherapi.com.


## Installation and Testing

1. Clone the repository

```bash
  git clone https://github.com/clubmicrolab/Solar-Sense.git
```
2. Run the command to install all python dependencies.

```bash
  cd pbl-prediction-api
  pip install -r requirements.txt
```
3. Start the server.

```bash
  python main.py
```  
4. Open `http://localhost:8080/` and check out our solution.
## Real Data Visualization

To visualize the real data and real time statistics from the solar panels, follow the steps below:
1. Access the link `http://18.197.198.110:3000/?orgId=1`
2. Login: guest
3. Password: 2023Password_for_guest_user

## License

[MIT](https://mit-license.org)

