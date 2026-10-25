from typing import Annotated

from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from oauth_google import generate_google_oauth_redirect_uri
from config import settings

import httpx


router = APIRouter(prefix='/auth')


class TokenRequest(BaseModel):
    code: str


@router.get('/google/url')
def get_google_oauth_redirect_uri():
    uri = generate_google_oauth_redirect_uri()
    print(f"DEBUG: Generated URI: {uri[:100]}...")
    return {"url": uri}


@router.post('/google/token')
async def exchange_code_for_token(req: TokenRequest):
    google_token_url = "https://oauth2.googleapis.com/token"

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            google_token_url,
            data={
                "client_id": settings.OAUTH_GOOGLE_CLIENT_ID,
                "client_secret": settings.OAUTH_GOOGLE_CLIENT_SECRET,
                "grant_type": "authorization_code",
                "redirect_uri": "http://localhost:5173/auth/google",
                "code": req.code,
            },
        )

    if resp.status_code != 200:
        print(f"Token exchange failed: {resp.text}")
        raise HTTPException(400, "Token exchange failed")

    return resp.json()