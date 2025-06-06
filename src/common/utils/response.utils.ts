export interface APIResponse<T = any> {
	message: string | string[];
	timestamp: string;
	path?: string;
	data?: T;
}

export function createSuccessResponse<T>(
	data: T,
	message = 'Success',
): APIResponse {
	return {
		message,
		timestamp: new Date().toISOString(),
		data,
	};
}

export function createErrorResponse(
	message: string | string[],
	path?: string,
	data?: any,
): APIResponse {
	const formattedData =
		data && typeof data === 'object'
			? { ...data, message: undefined }
			: data;
	return {
		message,
		timestamp: new Date().toISOString(),
		path,
		data: formattedData,
	};
}
