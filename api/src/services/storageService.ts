import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { SeasonDocument } from '@pickem/types';

export async function getSeasonDocument(): Promise<SeasonDocument> {
    const dynamo = new DynamoDBClient({ region: 'us-east-1' });
    console.log('created dynamo db client');
    const documentClient = DynamoDBDocument.from(dynamo, {
        marshallOptions: { removeUndefinedValues: true },
    });
    console.log('created dynamo db document client');
    try {
        const response = await documentClient.get({
            TableName: 'pickem-seasons',
            Key: {
                year: '2022',
            },
        });
        console.log(
            `Get season document successful: ${JSON.stringify(response)}`
        );
        return response.Item as SeasonDocument;
    } catch (error) {
        console.error(
            `Error getting season document from dynamodb: ${JSON.stringify(
                error
            )}`
        );
        throw error;
    } finally {
        documentClient.destroy();
        dynamo.destroy();
    }
}
