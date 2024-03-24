import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useStore } from '@nanostores/react';
import { currentPrompt } from '../stores/promptStore';

const useInitialPrompt = () => {
  const $currentPrompt = useStore(currentPrompt);
  // useEffect(() => {
  //   currentPrompt.set(initialPrompt)
  // }, [initialPrompt])

  useEffect(() => {
    const fetchInitialPrompt = async () => {
      const genAI = new GoogleGenerativeAI('AIzaSyCMjnrNxmI4zHSIXUroi92qshhyJwsCAN4'); // Assuming you've stored your API key in an environment variable
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are now an API for a text-based choose your own adventure game that returns JSON responses. You will respond with absolutely nothing but valid JSON. The game will be set in a fantasy world inspired by authors like Brandon Sanderson, offering a rich and immersive experience. You will use your knowledge and language capabilities to:
Generate engaging and descriptive narrative passages, transporting the player to fantastical locations and immersing them in the story.
Offer the player meaningful choices that impact the story's direction, including moral dilemmas, exploration options, and combat decisions.
Track the player's progress and adjust the narrative accordingly, ensuring their choices have lasting consequences.
Respond to player input in a natural and interactive way, seamlessly blending dark and humorous elements to create a dynamic and engaging tone.
Output all responses in JSON format, including narrative text, available choices, and any relevant game state information, to ensure smooth integration with the front-end application.
Additionally, consider the following:
Explore interesting fantasy elements and themes, such as unique magic systems, mythical creatures, and political intrigue. The story should take place in the Meow Wolf universe.
IMPORTANT: return response in JSON format [{}]
DO NOT INCLUDE BACKTICKS IN THE RESPONSE
sample response: 
{
  "narrative": "creative narrative here",
  "choices": [
    {
      "text": "Choice 1",
      "next": "choice_1"
    },
    {
      "text": "Choice 2",
      "next": "choice_2"
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const formattedResponse = JSON.parse(response)
      currentPrompt.set(formattedResponse)
    };

    fetchInitialPrompt();

  }, []); // Run only once on component mount
};

export default useInitialPrompt;
