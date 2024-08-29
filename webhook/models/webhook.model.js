import mongoose from 'mongoose';
const { Schema } = mongoose;

const webhookSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

webhookSchema.pre('save', function(next) {
    const webhook = this;
    if (!isValidURL(webhook.url)) {
        const err = new Error('URL invalide');
        next(err);
    } else {
        next();
    }
});

function isValidURL(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

const Webhook = mongoose.model('Webhook', webhookSchema);

export default Webhook;
