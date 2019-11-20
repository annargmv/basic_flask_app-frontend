import React, {useState} from "react";
import { Form, Input, FormField, Rating, Button} from "semantic-ui-react";

export const MovieForm = (onNewMovie) => {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);

    return (
        <Form>
            <FormField>
                <Input 
                placeholder="Movie title" 
                value={title} 
                onChange={e => setTitle(e.target.value)}/>
            </FormField>

            <FormField>
                <Rating 
                icon='star' 
                value={rating}
                maxRating={5}
                onRate={(_, data) => {
                    setRating(data.rating)
                }}/>
            </FormField>

            <FormField>
                <Button onClick={async () => {
                    const movie = {title, rating}
                    const response = await fetch('/add_movie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movie)
                    });

                    if (response.ok){
                        console.log("worked");
                        onNewMovie(movie);
                    }
                }}>submit</Button> 
            </FormField>
        </Form>
    );
};