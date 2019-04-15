# Setting up Auth

1) Create an AWS Cognito User Pool with
    - Attributes:
        - Select Email address or phone number
        - Select Allow email addresses
    - Policies
        - Uncheck Require special character
    - Message customizations
        - Verification type select Link
    - App clients
        - Add another app client
            - Unselect Generate client secret
    - Domain Name
        - Create a domain prefix
2) From Federated Identities
    - Create a new identity pool
        -Add User Pool ID and App client id from user pool above
3) In /src, create aws-exports.js
    ```
    const awsmobile = {
        "aws_project_region": "region",
        "aws_cognito_identity_pool_id": "region:federated_identities",
        "aws_cognito_region": "region",
        "aws_user_pools_id": "pool_id",
        "aws_user_pools_web_client_id": "app_client_id"
    };
    export default awsmobile;
    ```