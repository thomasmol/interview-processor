<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" viewBox="0 0 24 24">
	<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
	<path
		fill="currentColor"
		d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
</svg>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	svg {
		height: 1.25rem;
		width: 1.25rem;
		animation: spin 1s linear infinite;
	}

	svg circle {
		opacity: 0.25;
	}

	svg path {
		opacity: 0.75;
	}
</style>
