import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { SeasonDocument } from './storageTypes';

export async function putSeasonDocument(season: SeasonDocument): Promise<void> {
    const dynamo = new DocumentClient({ region: 'us-east-1' });

    const result = await dynamo
        .put({
            TableName: 'pickem-seasons',
            Item: { year: season.year.toString(), season },
        })
        .promise();

    if (!!result.$response.error) {
        console.error(
            `Error updating season in dynamodb: ${JSON.stringify(
                result.$response.error
            )}`
        );
        throw result.$response.error;
    }
}
