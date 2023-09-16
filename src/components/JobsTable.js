import LoadingSpinner from "./LoadingSpinner";

export default function JobsTable({ loading, feedItems }) {
    if (loading) {
        return (
            <LoadingSpinner loadingMessage="Loading Jobs, please wait"></LoadingSpinner>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {feedItems.map((job, index) => (
                    <tr key={index}>
                        <td>{job.title} </td>
                        <td>{job.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
