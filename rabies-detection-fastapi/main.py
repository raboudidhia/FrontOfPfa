from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import torch
import numpy as np

app = FastAPI(title="Rabies Detection API")

class LogRawRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("Raw request headers:", dict(request.headers))
        try:
            body = await request.body()
            print("Raw request body (first 100 bytes):", body[:100])
        except Exception as e:
            print(f"Error reading raw body: {str(e)}")
        response = await call_next(request)
        return response

app.add_middleware(LogRawRequestMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "best.pt"
try:
    model = YOLO(model_path)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise e

class_names = [
    "Incoordination",
    "barking",
    "bone in throat syndrome",
    "digging",
    "dropped jaw_toungh",
    "hyper_salivation"
]

def preprocess_image(image: Image.Image):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize((640, 640), Image.Resampling.LANCZOS)
    return image

def post_process_output(results):
    max_confidence = 0.0
    detected_symptom = "None"
    best_class = -1

    for result in results:
        boxes = result.boxes.data.cpu().numpy()
        for box in boxes:
            print(f"Box attributes: {len(box)} - {box}")
            if len(box) != 6:  # Expecting 6 attributes for now (x1, y1, x2, y2, confidence, class_id)
                print(f"Warning: Expected 6 attributes, got {len(box)}")
                continue
            
            confidence = float(box[4])  # Objectness confidence
            class_id = int(box[5])  # Class ID

            print(f"Objectness confidence: {confidence}, Class ID: {class_id}, Class: {class_names[class_id]}")

            if confidence < 0 or confidence > 1:
                print(f"Invalid confidence value: {confidence}")
                continue

            if confidence > max_confidence and confidence > 0.1:  # Use objectness confidence directly
                max_confidence = confidence
                best_class = class_id
                detected_symptom = class_names[best_class]

    result = {
        "confidence": max_confidence,
        "symptom": detected_symptom
    }

    if max_confidence >= 0.3:
        result["message"] = "Your dog probably has rabies. Take care and take him to the nearest clinic."
        result["status"] = "warning"
    else:
        result["message"] = "Your dog seems okay, but you should monitor him more closely."
        result["status"] = "info"

    return result

@app.post("/detect-rabies/")
async def detect_rabies(request: Request):
    try:
        print("Request headers:", dict(request.headers))
        form = await request.form()
        print("Form data keys:", list(form.keys()))
        print("Form data items:", list(form.items()))
        
        file = None
        for key, value in form.items():
            print(f"Found key: {key}")
            if key == "file":
                file = value
                break
        
        if file is None:
            raise HTTPException(status_code=400, detail="No file provided in form data")
        
        print("Received file:", file.filename)
        contents = await file.read()
        print(f"File size: {len(contents)} bytes")
        image = Image.open(io.BytesIO(contents))
        print("Image opened successfully")
        
        image = preprocess_image(image)
        print("Image preprocessed")
        
        results = model.predict(image, imgsz=640, conf=0.5)
        print("Inference completed")
        
        detection_result = post_process_output(results)
        print("Detection result:", detection_result)
        
        return JSONResponse(content=detection_result)
    except Exception as e:
        print(f"Error during detection: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/raw-upload/")
async def raw_upload(request: Request):
    try:
        print("Request headers:", dict(request.headers))
        form = await request.form()
        print("Form data keys:", list(form.keys()))
        print("Form data items:", list(form.items()))
        
        file = None
        for key, value in form.items():
            print(f"Found key: {key}")
            if key == "file":
                file = value
                break
        
        if file is None:
            raise HTTPException(status_code=400, detail="No file provided in form data")
        
        print("Received file:", file.filename)
        contents = await file.read()
        print(f"File size: {len(contents)} bytes")
        return JSONResponse(content={"message": f"File received: {file.filename}", "size": len(contents)})
    except Exception as e:
        print(f"Error during raw upload: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)