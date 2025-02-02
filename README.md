# innoscripta

---

# 📰 News Aggregator - React & TypeScript

---

![Image Link](https://res.cloudinary.com/dc3akfh6t/image/upload/v1738481809/rkcm5bv19oyqdak0n4ox.png)

## 📌 Project Overview

This is a **news aggregator** web application built with **React.js** and **TypeScript**. It allows users to browse, search, and filter news articles from multiple sources, creating a personalized news feed.

The application is fully **containerized with Docker** for easy deployment and reproducibility.

## 🚀 Features

✅ **Article Search & Filtering**:

- Search for articles by **keyword**.
- Filter results by **date**, **category**, and **source**.

✅ **Personalized News Feed**:

- Users can **select** preferred sources, categories, and authors to customize their feed.

✅ **Mobile-Responsive Design**:

- The UI is optimized for **desktop, tablet, and mobile** devices.

✅ **API Integration**:

- Articles are fetched from **at least three news sources**, such as:
  - NewsAPI
  - The Guardian
  - New York Times

✅ **Docker Support**:

- The app can be run inside a **Docker container** for a consistent environment across systems.

## 🏗️ Tech Stack

- **Frontend**: React.js, TypeScript
- **Styling**: Tailwind CSS / Styled Components
- **Data Fetching**: Axios
- **API Integration**: NewsAPI, Gaurdian News, The New York Times, etc.
- **Storage**: IndexedDB / LocalStorage for caching API responses
- **Containerization**: Docker

## Running the Application with Docker Compose

Please clone the github To start the services defined in docker-compose.yml, move to project directory and run the following command:

```
cd innoscripta_project
docker compose up -d
```
To stop the container:
```
docker compose down
```

This will:

 - Pull necessary images (if not already available locally)
 - Create and start the defined services in detached mode (-d runs in the background)
  
Once the compose command is successfull. Please run the respective commands give below as the second point to start the container on port 3000.


## 🐳 Running with Docker

1. **Build the Docker Image**
   ```sh
   docker build -t nayankumar1998/newsapp .
   ```
2. **Run the Container**
   ```sh
   docker run -p 3000:5173 nayankumar1998/innoscripta-web
   ```

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/NAYANKUMAR21/innoscripta_project.git
cd innoscripta_project
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add your API keys:

```env
VITE_GUARDIAN_API_KEY = your_api_key
VITE_NYT_API_KEY = your_api_key
VITE_NEWS_API_KEY = your_api_key

VITE_GUARDIAN_API_BASE_URL = your_base_url
VITE_NYT_API_BASE_URL = your_base_url
VITE_NEWS_API_BASE_URL = your_base_url

```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 Best Practices Followed

- **DRY & KISS**: Minimized redundant code, keeping components simple and reusable.
- **SOLID Principles**: Ensured modular and extensible design.
- **Efficient API Handling**: Implemented **IndexedDB caching** to reduce unnecessary API calls.
- **Normalisation of Data**: Data Fetched from various api's and convert them to one single format.
