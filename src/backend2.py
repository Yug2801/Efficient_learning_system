from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
import torch.nn as nn
import pytorch_lightning as pl
from torch.utils.data import DataLoader, TensorDataset
from torch import optim
from collections import deque

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define the PyTorch Lightning Module
class DQNAgent(pl.LightningModule):
    def __init__(self, state_size, action_size, learning_rate=0.001, gamma=0.95):
        super().__init__()
        self.save_hyperparameters()
        self.state_size = state_size  # Store state size
        self.action_size = action_size  # Store action size
        self.memory = deque(maxlen=2000)
        self.model = self._build_model()

    def _build_model(self):
        model = nn.Sequential(
            nn.Linear(6, 24),
            nn.ReLU(),
            nn.Linear(24, 24),
            nn.ReLU(),
            nn.Linear(24, 6),  # Output size adjusted to 6 for category and level
            nn.Sigmoid()  # Using Sigmoid activation to ensure outputs are in [0, 1] range
        )
        return model

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        state, action, reward, next_state, done = batch
        q_values = self.forward(state)
        target = reward + (1 - done) * self.hparams.gamma * torch.max(self.forward(next_state), dim=1)[0]
        loss = nn.MSELoss()(q_values.gather(1, action.unsqueeze(1)), target.unsqueeze(1))
        self.log('train_loss', loss)
        return loss

    def configure_optimizers(self):
        return optim.Adam(self.parameters(), lr=self.hparams.learning_rate)

    def train_dataloader(self):
        data = torch.zeros((1, self.hparams.state_size))
        target = torch.zeros((1, self.hparams.action_size))
        dataset = TensorDataset(data, target)
        return DataLoader(dataset)

# Initialize the models for each subject with initial category and level
initial_category = 'verbal'
initial_level = 'beginner'

models = {
    'Science': {'category': initial_category, 'level': initial_level, 'model': DQNAgent(state_size=3, action_size=3)},
    'Math': {'category': initial_category, 'level': initial_level, 'model': DQNAgent(state_size=3, action_size=3)},
    'English': {'category': initial_category, 'level': initial_level, 'model': DQNAgent(state_size=3, action_size=3)}
}

# Set the models to evaluation mode
for subj_data in models.values():
    subj_data['model'].eval()

# Track the feedback counts for each category and level for each subject
category_counts = {subj: {'visual': 0, 'verbal': 0, 'auditory': 0} for subj in models}
level_counts = {subj: {'beginner': 0, 'intermediate': 0, 'advanced': 0} for subj in models}
total_feedback_count = 0

# Function to print the categories and levels of each subject
def print_subjects():
    for subj, data in models.items():
        print(f"{subj}: Category: {data['category']}, Level: {data['level']}")

# Endpoint for receiving feedback
@app.route('/feedback', methods=['POST'])
def receive_feedback():
    global total_feedback_count
    try:
        data = request.json
        subject = data.get('subject')  # Assuming subject is also provided in the request
        category = data.get('category', initial_category)  # Default to initial category if not provided
        level = data.get('level', initial_level)  # Default to initial level if not provided

        # Update counts for the chosen category and level
        category_counts[subject][category] += 1
        level_counts[subject][level] += 1
        total_feedback_count += 1

        # Determine the most chosen category and level
        most_chosen_category = max(category_counts[subject], key=category_counts[subject].get)
        most_chosen_level = max(level_counts[subject], key=level_counts[subject].get)

        # Update the category and level based on the most chosen ones
        models[subject]['category'] = most_chosen_category
        models[subject]['level'] = most_chosen_level

        # Print the updated categories and levels
        print_subjects()

        # Return the results
        return jsonify({"subject": subject, "category": models[subject]['category'], "level": models[subject]['level']})

    except Exception as e:
        print("Error processing feedback:", e)
        return jsonify({"error": "Internal server error"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
