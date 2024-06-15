import { AutoModelForCausalLM, AutoTokenizer } from '@huggingface/transformers';
import * as torch from 'torch';

class ChatbotModel {
    constructor() {
        this.tokenizer = AutoTokenizer.from_pretrained("/home/PSYCHIKA-QLORA/psychika");
        this.model = AutoModelForCausalLM.from_pretrained("/home/PSYCHIKA-QLORA/psychika");
    }

    async generateResponse(messages) {
        // Create a single string from the messages
        const chatHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
        
        // Tokenize the concatenated chat history
        const inputs = this.tokenizer.encode(chatHistory, { return_tensors: 'pt' });
        
        // Generate response from the model
        const outputs = await this.model.generate(inputs);
        
        // Decode and return the model's response
        const response = this.tokenizer.decode(outputs[0], { skip_special_tokens: true });
        
        return response;
    }
}

export default ChatbotModel;
