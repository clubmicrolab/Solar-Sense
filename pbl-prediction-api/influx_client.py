from influxdb import InfluxDBClient

client = InfluxDBClient('18.197.198.110', 8086, 'mppsolar',
                        'mppsolar-secured-password', 'mppsolar')


last_7days_wd_query = '''
    SELECT sum("pv1_charging_power") 
    FROM "mpp-solar" WHERE time >= now() - 7d and time <= now() 
    GROUP BY time(24h) fill(0) 
    ORDER BY time DESC
    LIMIT 7'''

last_7days_wh_query = '''
    SELECT sum("pv1_charging_power") 
    FROM "mpp-solar" 
    WHERE time >= now() - 7d and time <= now() 
    GROUP BY time(1h) fill(0) 
    ORDER BY time DESC
    LIMIT 168'''


def query_influxdb(query):
    return list(client.query(query).get_points())
