// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type Interview = {
	transcript: string;
	summary: string;
};

type BananaTranscriptResponse = {
	id: string;
	message: string;
	created: number;
	apiVersion: string;
	modelOutputs: [
		{
			text: string;
		}
	];
};

