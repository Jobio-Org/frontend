# API Client Guide

Auto-generated TypeScript client from NestJS backend. Backend controllers/DTOs → OpenAPI → TypeScript client.

## How API Client Generation Works

The API client is automatically generated using a **code-first approach** with the following flow:

### 1. NestJS OpenAPI Schema Generation

The backend uses **NestJS Swagger** decorators to automatically generate OpenAPI specifications:

- **Controllers** are decorated with `@ApiTags('auth')` for grouping endpoints
- **Endpoints** use `@ApiOperation({ operationId: 'signIn' })` for method names
- **DTOs** define request/response schemas using `class-validator` decorators
- **Body/Query parameters** are specified with `@ApiBody()`, `@ApiQuery()` etc.

Example controller structure:

```typescript
@ApiTags('auth')
@Controller('auth')
export class CredentialsAuthController {
	@ApiOperation({ operationId: 'signIn' })
	@ApiBody({ type: EmailPasswordCredentialsDto })
	@Post('sign-in')
	async signIn(@Body() credentials: EmailPasswordCredentialsDto) {
		// ...
	}
}
```

### Use in frontend

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Add permission to 'read:packages'
4. Then in the frontend terminal paste:

    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@jobio-org
    ```

5. Enter your Github username and generated token as a password
6. Then you can run `npm i @jobio-org/api-client` and didn't get 403 error

**_Note:_**
Ensure that you have .npmrc file in the root of your project with following code:

```
@jobio-org:registry=https://npm.pkg.github.com
```

**Import services:**

```typescript
import { apiService } from "~/shared/api";

const user = await apiService().auth.signIn({
    requestBody: { email, password }
});
```
