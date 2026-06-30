import fs from 'fs';
import readline from 'readline';

async function extract() {
    const fileStream = fs.createReadStream('/Users/nitinverma/.gemini/antigravity-ide/brain/1ccf69bb-70ee-4efd-beda-da95c305151d/.system_generated/logs/transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lastWrite = null;
    let lastContent = '';

    for await (const line of rl) {
        if (line.includes('index.html')) {
            try {
                const entry = JSON.parse(line);
                if (entry.tool_calls) {
                    for (const call of entry.tool_calls) {
                        if (call.name === 'default_api:write_to_file' || call.name === 'default_api:replace_file_content' || call.name === 'default_api:multi_replace_file_content') {
                            if (call.arguments && call.arguments.TargetFile === '/Users/nitinverma/Downloads/Game/index.html') {
                                if (call.name === 'default_api:write_to_file') {
                                    lastContent = call.arguments.CodeContent;
                                }
                            }
                        }
                    }
                }
            } catch (e) {}
        }
    }
    fs.writeFileSync('/Users/nitinverma/Downloads/Game/index_recovered.html', lastContent);
    console.log('Recovered to index_recovered.html');
}

extract();
