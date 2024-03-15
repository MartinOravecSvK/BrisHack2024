# MoodMap

Welcome to MoodMap, an advanced web application designed for the Brishack 2024 hackathon. MoodMap utilises cutting-edge facial recognition algorithms to interpret and map people's emotions, providing valuable insights into the collective mood of a nation. It is a powerful tool that can be utilised by the government to track the mental health of a population.

![Example Image](home.png)

## Features

- **Real-Time Emotional Mapping**: MoodMap captures video feed from webcams, livestreams, and videos to create a dynamic representation of the nation's mood in real-time.

- **Emotion Heat Map**: The emotions are visualised as a heat map, providing an intuitive and comprehensive overview of the emotional landscape. Users can identify specific emotions by simply hovering over the heat map.

- **Government Utilisation**: MoodMap serves as a valuable resource for governments to assess and monitor the mental health of the nation. The insights gained can assist in resource allocation for early intervention and support where needed the most.

![Example Image](main.png)

## Technology Stack

- **Backend**: Developed using the robust and versatile Python programming language.

- **Frontend**: Powered by React to ensure a sleek, interactive, and user-friendly interface.

- **Data Handling**: Firebase is integrated for seamless data handling, ensuring efficient and secure processing of information.

- **Facial Emotion Recognition**: Leveraging the power of TensorFlow for accurate and advanced facial emotion recognition.

- **User Interface**: Tailwind is employed to create a polished and aesthetically pleasing user interface, enhancing the overall user experience.

## Getting Started

1. **Clone the Repository**:
   ```
   git clone https://github.com/MartinOravecSvK/BrisHack2024.git
   ```

2. **Add .env file**

   ```
   cd react_template
   ```

   Add .env with the following variables:

   ```
   REACT_APP_BASE_URL=http://127:0:0:1:8000
   REACT_APP_MODE="development"
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR-KEY
   FIREBASE_DATABASE_UR=YOUR-KEY
   ```

### Frontend (visualization web app)

1. **Install Dependencies**:
   ```
   cd react_template
   npm install --legacy-peer-deps
   ```

2. **Run the Application**:
   ```
   npm start
   ```

3. **Open Your Browser**:
   Navigate to `http://localhost:3000` to experience MoodMap firsthand.



### Backend

0. **Locate Backend**

   ```bash
   cd backend/emotionRecog
   ```

1. **Install Dependencies**

   Using conda:

   ```bash
   conda create my-env python=3.11
   conda install 
   ```

## Contribution Guidelines

We welcome contributions from the community to enhance MoodMap. If you have ideas, bug fixes, or new features, feel free to submit a pull request.

Let's work together to foster connection through shared emotional experiences and create a sense of belonging that transcends geographical boundaries!
