from influxdb import InfluxDBClient

client = InfluxDBClient('18.197.198.110', 8086, 'mppsolar',
                        'mppsolar-secured-password', 'mppsolar')

result = client.query('SELECT * FROM "mpp-solar" ORDER BY time DESC LIMIT 1')
# result = client.query('SHOW MEASUREMENTS')

print(result)
