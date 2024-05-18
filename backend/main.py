from fastapi import FastAPI , Request
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import List , Dict
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()

origins=[
    'http://localhost',
    'http://localhost:5173',
    'https://beyond-chats.vercel.app',
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

API_ENPOINT ='https://devapi.beyondchats.com/api/get_message_with_sources'
@app.post("/get_citations",response_model=List[Dict[str,str]])
def get_citations(request:Request):
    response = requests.get(API_ENPOINT)

    data = response.json()
    citations = []
    for item in data['data']['data']:
        if 'source' in item:
            for source in item['source']:
                if len(source['link']) > 0:
                    if 'origin' in request.headers:
                        citations.append(source)
                    else:
                        citations.append({'id':source['id'],'link':source['link']})
    return citations

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)        


