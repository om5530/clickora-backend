# Re Generates the client library in the frontend project
java -jar ./swagger-codegen-cli.jar generate -i ./src/public/swagger/swagger.yaml -l typescript-angular -o ../clickora-frontend/src/swagger --additional-properties ngVersion=17.0,providedInRoot=true,supportsES6=true,modelPropertyNaming=original
cd ../clickora-frontend
./sanitize-swagger.sh
