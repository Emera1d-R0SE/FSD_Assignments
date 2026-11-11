from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return """<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Flask Docker Lab</title>


    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #eef2ff, #f8fafc);
            color: #1e293b;
        }

        .container {
            width: 90%;
            max-width: 850px;
            background: white;
            border-radius: 24px;
            padding: 50px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
        }

        .icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 25px;
            border-radius: 20px;
            background: #2563eb;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            font-weight: bold;
        }

        h1 {
            font-size: 38px;
            margin-bottom: 12px;
            color: #0f172a;
        }

        .subtitle {
            font-size: 18px;
            color: #64748b;
            margin-bottom: 30px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 18px;
            border-radius: 50px;
            background: #dcfce7;
            color: #166534;
            font-weight: bold;
            margin-bottom: 35px;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #22c55e;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 20px;
        }

        .card {
            padding: 22px 15px;
            background: #f8fafc;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
        }

        .card h3 {
            font-size: 16px;
            margin-bottom: 8px;
            color: #334155;
        }

        .card p {
            font-size: 14px;
            color: #64748b;
        }

        .footer {
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #e2e8f0;
            color: #94a3b8;
            font-size: 14px;
        }

        @media (max-width: 650px) {
            .container {
                padding: 35px 20px;
            }

            h1 {
                font-size: 30px;
            }

            .cards {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="icon">⚡</div>

        <h1>Flask Docker Lab</h1>

        <p class="subtitle">
            A Flask web application running inside a Docker container
        </p>

        <div class="status">
            <span class="dot"></span>
            Application Running
        </div>

        <div class="cards">

            <div class="card">
                <h3>🐍 Framework</h3>
                <p>Python Flask</p>
            </div>

            <div class="card">
                <h3>🐳 Container</h3>
                <p>Docker</p>
            </div>

            <div class="card">
                <h3>🌐 Port</h3>
                <p>5000</p>
            </div>

        </div>

        <div class="footer">
            Containerization Lab – 2<br>
            Flask Application Deployment using Docker
        </div>

    </div>
</body>
</html>
"""

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
