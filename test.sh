#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Testing QUENERECRUIT Authentication API"
echo "======================================"

# Base URL
BASE_URL="http://localhost:5000/api/auth"

# 1. Test Registration
echo -e "\n${GREEN}1. Testing User Registration${NC}"
REGISTER_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123!","role":"recruiter"}' \
  ${BASE_URL}/register)
echo "Response: $REGISTER_RESPONSE"

# 2. Test Login
echo -e "\n${GREEN}2. Testing User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  ${BASE_URL}/login)
echo "Response: $LOGIN_RESPONSE"

# Extract token from login response
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}Failed to get token. Subsequent tests will fail.${NC}"
  exit 1
fi

# 3. Test Get Profile
echo -e "\n${GREEN}3. Testing Get Profile${NC}"
PROFILE_RESPONSE=$(curl -s -X GET \
  -H "Authorization: Bearer $TOKEN" \
  ${BASE_URL}/profile)
echo "Response: $PROFILE_RESPONSE"

# 4. Test Update Profile
echo -e "\n${GREEN}4. Testing Update Profile${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username":"updateduser","email":"test@example.com"}' \
  ${BASE_URL}/profile)
echo "Response: $UPDATE_RESPONSE"

# 5. Test Change Password
echo -e "\n${GREEN}5. Testing Change Password${NC}"
PASSWORD_RESPONSE=$(curl -s -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"Test123!","newPassword":"NewTest123!"}' \
  ${BASE_URL}/change-password)
echo "Response: $PASSWORD_RESPONSE"

echo -e "\n${GREEN}Testing Complete!${NC}" 