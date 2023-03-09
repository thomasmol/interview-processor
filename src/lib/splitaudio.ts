import ffmpeg from 'fluent-ffmpeg';

const splitAudio = async (
	inputFilePath: string,
	chunkDurationSeconds: number
): Promise<string[]> => {
	const filePaths: string[] = [];
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
			if (err) {
				console.error(err);
				return;
			}

			const durationInSeconds = metadata.format.duration || 0;

			const fileName = inputFilePath.split('/')[inputFilePath.split('/').length - 1];

			let x = 0;
			for (let i = 0; i < durationInSeconds; i += chunkDurationSeconds) {
				const startTime = i;
				const outputFilePath = `./static/audios/chunks/${i}-${
					i + chunkDurationSeconds
				}-${fileName}.mp3`;
				ffmpeg(inputFilePath)
					.setStartTime(startTime)
					.setDuration(chunkDurationSeconds)
					.output(outputFilePath)
					.on('end', () => {
						console.log(`Chunk ${outputFilePath} has been created.`);
						filePaths.push(outputFilePath);
						x++;
						if (x >= durationInSeconds / chunkDurationSeconds) {
							resolve(filePaths.sort());
						}
					})
					.on('error', (err) => {
						console.error(err);
						reject(err);
					})
					.run();
			}
		});
	});
};

export default splitAudio;
