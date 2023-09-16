import LoadingSpinner from "./LoadingSpinner";
import '../styles/jobs_table.css';
export default function JobsTable({ loading, feedItems }) {
    if (loading) {
        return (
            <LoadingSpinner loadingMessage="Loading Jobs, please wait" />
        );
    }
    if (feedItems.length === 0) {
        return <div>No jobs available.</div>;
    }
    return (
        <table className="jobs-table">
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
