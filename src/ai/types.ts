export interface ToolCall {
	id: string
	type: 'function'
	function: { name: string; arguments: string }
}

export interface ChatMessage {
	role: 'user' | 'assistant' | 'system' | 'tool'
	content: string
	tool_call_id?: string
	tool_calls?: ToolCall[]
}

export interface ToolDefinition {
	type: 'function'
	function: {
		name: string
		description: string
		parameters?: {
			type: 'object'
			properties: Record<string, unknown>
			required?: string[]
		}
	}
}

export interface Tool {
	definition: ToolDefinition
	execute(args: Record<string, unknown>, toolCallId: string): Promise<string>
}

export interface AIBackend {
	readonly name: string
	checkAvailability(): Promise<'readily' | 'after-download' | 'unavailable'>
	initialize(onProgress?: (progress: number, status: string) => void): Promise<void>
	chat(
		messages: ChatMessage[],
		onChunk: (chunk: string) => void,
		signal?: AbortSignal,
		tools?: Tool[],
	): Promise<void>
	destroy(): void
}

export interface ModelInfo {
	id: string
	label: string
	sizeMb: number
}

export const MODELS: ModelInfo[] = [
	// Qwen 2.5 Instruct (Apache 2.0)
	{ id: 'onnx-community/Qwen2.5-0.5B-Instruct', label: 'Qwen 2.5 · 0.5B', sizeMb: 395 },
	{ id: 'onnx-community/Qwen2.5-1.5B-Instruct', label: 'Qwen 2.5 · 1.5B', sizeMb: 986 },
	{ id: 'onnx-community/Qwen2.5-3B-Instruct', label: 'Qwen 2.5 · 3B', sizeMb: 1880 },
	// Qwen 3 (Apache 2.0)
	{ id: 'onnx-community/Qwen3-0.6B', label: 'Qwen 3 · 0.6B', sizeMb: 440 },
	{ id: 'onnx-community/Qwen3-1.7B', label: 'Qwen 3 · 1.7B', sizeMb: 1080 },
	// SmolLM 2 (Apache 2.0)
	{ id: 'HuggingFaceTB/SmolLM2-135M-Instruct', label: 'SmolLM 2 · 135M', sizeMb: 140 },
	{ id: 'HuggingFaceTB/SmolLM2-360M-Instruct', label: 'SmolLM 2 · 360M', sizeMb: 360 },
	{ id: 'HuggingFaceTB/SmolLM2-1.7B-Instruct', label: 'SmolLM 2 · 1.7B', sizeMb: 1800 },
	// Phi 3.5 (MIT)
	{ id: 'onnx-community/Phi-3.5-mini-instruct', label: 'Phi 3.5 Mini · 3.8B', sizeMb: 2200 },
]
