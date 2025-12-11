# docgen/api.py
from ninja import NinjaAPI
from docx_generate.api import router as docx_router
from docx_generate.auth import JWTAuth

api = NinjaAPI(auth=JWTAuth())

# Принудительно переопределяем схему безопасности (Swagger)
@api.get("/openapi.json", include_in_schema=False)
def custom_openapi(request):
    schema = api.get_openapi_schema()
    schema["components"]["securitySchemes"] = {
        "Bearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in schema["paths"].values():
        for method in path.values():
            method["security"] = [{"Bearer": []}]
    return schema

api.add_router("/docx/", docx_router)