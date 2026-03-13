#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Wire.h>
#include "Adafruit_VL53L0X.h" // Install this via Library Manager

// Helper files included with the library
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// 1. Wi-Fi and Firebase Details
#define WIFI_SSID "Dhanu"
#define WIFI_PASSWORD "danush123"
#define API_KEY "AIzaSyCVQNcn8xvtFPfR8xroQmsXEpy4WE3GRYs"
#define DATABASE_URL "https://roadmapping-51ed4-default-rtdb.firebaseio.com/"

// 2. Sensor Pins
const int trigPin = 4;
const int echoPin = 2;
// SDA is GPIO 21, SCL is GPIO 22 (Default for ESP32)

// Firebase and Sensor Objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
Adafruit_VL53L0X lox = Adafruit_VL53L0X();

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  delay(1000); 

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Initialize ToF Sensor
  if (!lox.begin()) {
    Serial.println(F("Failed to boot VL53L0X. Check wiring on D21/D22!"));
    delay(2000); 
  }
  Serial.println(F("VL53L0X Initialized OK"));

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n[SUCCESS] Connected to Wi-Fi!");

  // Firebase Configuration
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase Signup OK");
    signupOK = true;
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED && Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 500)) {
    sendDataPrevMillis = millis();

    // --- 1. Capture Ultrasonic Data ---
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    long duration = pulseIn(echoPin, HIGH);
    int depth = duration * 0.034 / 2;

    // --- 2. Capture ToF Sensor Data ---
    VL53L0X_RangingMeasurementData_t measure;
    lox.rangingTest(&measure, false);
    float tof_cm = (measure.RangeStatus != 4) ? measure.RangeMilliMeter / 10.0 : 0;

    // --- 3. Serial Monitor Output ---
    Serial.print("Road Depth: ");
    Serial.print(depth);
    Serial.print(" cm | ToF: ");
    Serial.print(tof_cm, 1);
    Serial.println(" cm");

    // --- 4. Live Updates to Firebase ---
    Firebase.setInt(fbdo, "/live/depth", depth);
    Firebase.setFloat(fbdo, "/live/obstacle", tof_cm); // Real-time ToF
    
    //// --- 5. Detection/Archiving Logic ---
    // Pothole Detection (Ultrasonic)
    if (depth > 10) {
      Firebase.pushInt(fbdo, "/detections/depth", depth);
      Serial.println(">>> POTHOLE ARCHIVED!");
    }

    // Obstacle Detection (ToF > 30cm)
    if (tof_cm < 5.0) {
      if (Firebase.pushFloat(fbdo, "/detections/obstacle", tof_cm)) {
        Serial.println(">>> OBSTACLE DETECTED & ARCHIVED!");
      }
      delay(500); // Small debounce delay
    }
    
  }

  if (WiFi.status() != WL_CONNECTED && millis() % 10000 == 0) {
    Serial.println("Waiting for Wi-Fi...");
  }
}


