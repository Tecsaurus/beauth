import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const accessToken = {
  access_token:
    "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LWJ1aWxkaW5nZXN0aW1hdGVzLmF1LmF1dGgwLmNvbS8ifQ..h7ihByV9l9WeZnYA.zjqp4Tp90pIlooh_y0SG4YtIrXPDdl4xOrgCOj5SY5nK9_N5_TAalKFby-0DeL3c4e065i1aqndcAUjH_IV518CV3bSOXrmUWX8J8nYSeZtoUiSAaSxsID8TyijCeX1Y7TfR4MGgeKePBOcRtc3EFJhdDJmi_0pAIqhyEWydop_ONlX8MkeLxHHuvtf5R7a4h27jM-n6Vp4ae4cVEJSlFEpVK6RuzYYAxkEex4cWuGmQvQqaNjrXSYcw9cqnLC_JNiFyi_92RpDMD7TtRcu3U_PpQEWZlh9iSsVd5Ki5hbM4AkLnk2G2Y6vuGBPhRNlQg8J41kWIJ7rVC5Gxo0N9wjU9Pchuz0WyAGaQZaIP24C5auf7uQ.kY2RYAiMOjw-puvgRX-ceA",
  refresh_token:
    "v1.MWD085nl2Is7OJYb_H6Iqul5Hn6gPu3_nDaA12iOQfcbB1l3NECqgbzMAce9THRY18Miih3zdWrg7iraXF3pze4",
  id_token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBYRzdlc3JLWG94Z0hVelBTZzl6UiJ9.eyJodHRwczovL2J1aWxkaW5nZXN0aW1hdGVzLmNvbS9yb2xlcyI6WyJhcmNoaXRlY3RzIiwib3JnYW5pemF0aW9uLWFkbWluIiwidXNlciJdLCJodHRwczovL2J1aWxkaW5nZXN0aW1hdGVzLmNvbS9wZXJtaXNzaW9ucyI6WyJhc3NpZ246Y3VzdG9tZXItbWFuYWdlciIsImFzc2lnbjppbmRpdmlkdWFsLXVzZXIiLCJhc3NpZ246b3JnYW5pemF0aW9uLWFkbWluIiwiYXNzaWduOnVzZXIiLCJjcmVhdGU6b3JnYW5pemF0aW9uLWN1c3RvbWVycyIsImNyZWF0ZTpvcmdhbml6YXRpb24tdXNlcnMiLCJkZWxldGU6am9icyIsImRlbGV0ZTpvcmdhbml6YXRpb24tY3VzdG9tZXJzIiwibGlzdDpvcmdhbml6YXRpb24tY3VzdG9tZXJzIiwibGlzdDp0cmFjay1wbGFuLWNoYW5nZXMiLCJsaXN0OnVzZXItcm9sZXMiLCJyZWFkOmpvYi1kZXRhaWxzLXN1bW1hcnkiLCJyZWFkOm9yZ2FuaXphdGlvbi1jdXN0b21lcnMiLCJyZWFkOm9yZ2FuaXphdGlvbi11c2VycyIsInVwZGF0ZTpvcmdhbml6YXRpb24tY3VzdG9tZXJzIiwidXBkYXRlOm9yZ2FuaXphdGlvbi11c2VycyJdLCJodHRwczovL2J1aWxkaW5nZXN0aW1hdGVzLmNvbS9zY29wZSI6WyJvcmdhbml6YXRpb246ZWZiNDFiYjAtOWE1NC0xMWVhLTgyNWMtZGQzMGVmMmE1NDg1Il0sImh0dHBzOi8vYnVpbGRpbmdlc3RpbWF0ZXMuY29tL3VzZXJJZCI6ImF1dGgwfDY0NTgyNDAzMzUzNDQ2NjIyZDdkODY5OSIsImdpdmVuX25hbWUiOiJQYXVsIiwiZmFtaWx5X25hbWUiOiJIdXRjaGVvbiIsIm5pY2tuYW1lIjoiZGV2ZWxvcGluZ2NvZGUyIiwibmFtZSI6ImRldmVsb3Bpbmdjb2RlMkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvM2Q2YWQ5NWFlMzM1NDhmNTJhMTBmNzNkOWE1NjQxZjg_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZkZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNS0yNlQxMToyODowMi42MTJaIiwiZW1haWwiOiJkZXZlbG9waW5nY29kZTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vdGVzdC1idWlsZGluZ2VzdGltYXRlcy5hdS5hdXRoMC5jb20vIiwiYXVkIjoib1RHMHA4UTJqUmRINTA2c0k2YnpsSkNQNDBCZWpoQUgiLCJpYXQiOjE2ODU0MDQwNzcsImV4cCI6MTY4NTQ0NzI3NSwic3ViIjoiYXV0aDB8NjQ2YWRjYmM3MGFiOGMwY2E5ZGFlMGQ4Iiwic2lkIjoicHBNeUpfZktaQTJQQk5MTEx3WklqeVFYb2pDZjFmQzIiLCJub25jZSI6ImFYUXlMVmhDUlZwcVEzVnVkRlp4V1c1RUxUVm1XRGMyU2tOTmFVaFdhMzVPTjFKWFdVaGtkelpwTVE9PSJ9.qIBgSq1NdK0TjrnSIj5Bjvam64CGXEHxfGqwlAvs8yKQU4EMdOwcJhO8RNJnR8FlLMXoxB3g-MKoQG94yITfE4OQ1L78rVdqCJe7oBkdv1X-YAKyuHDmGa8EuZk8B5-mcfL-JF76CglQq2LGjjhQTKCL_jsPODQ0aRe3p_YJD7LtuDjR_q_qBtKboOtdW4U9EBTm2R0RN2acx1uMYeUj7N0xknmSKfUXqt0Q41Wcu-REgf1EEZza2piQrefRxMNuiPK_JgLY19LOkCmW81xMXRr-VL2mPhuk1gR2-3OrtEBrMgAYYO4Tkv0BVrx3xDia0erLrYWm7h8JNRT7rZXknQ",
  scope: "openid profile email offline_access",
  expires_in: 86400,
  token_type: "Bearer",
};

// [{"organizationId":"organization:efb41bb0-9a54-11ea-825c-dd30ef2a5485","organizationName":"BEDC"}]

// GET job
// GET jobs
const JobsButton = () => {
  const hit = () => {
    /** Jobs */
    axios
      .get("http://localhost:3000/api/job", {
        headers: {
          Authorization: `Bearer ${accessToken.id_token}`,
        },
        params: {
          organizationId: "organization:efb41bb0-9a54-11ea-825c-dd30ef2a5485",
          limit: 10,
          fromDate: "2023-02-28T11:00:00.000Z",
          toDate: "2023-05-31T11:59:59.999Z",
        },
      })
      .then(function (response) {
        console.log("Jobs /", response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /** Job */
    axios
      .get(
        "http://localhost:3000/api/job/job:f3f589c0-eec0-11ed-94f1-6dd0a1293987/2023-05-09T23:26:47.905Z?time=1685404988364",
        {
          headers: {
            Authorization: `Bearer ${accessToken.id_token}`,
          },
        }
      )
      .then(function (response) {
        console.log("Job /", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return <button onClick={hit}>Jobs</button>;
};

// POST annoation
const AnnotationButton = () => {
  const ann = () => {
    axios
      .request({
        url: "http://localhost:3000/api/job/saveJobAnnotations",
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken.id_token}`,
        },
        data: {
          jobId: "job:f3f589c0-eec0-11ed-94f1-6dd0a1293987",
          sk: "2023-05-09T23:26:47.905Z",
          planTrackChangeId: "93a6527a-5ea0-49d9-9477-a2d43f05e459",
          annotations: [
            {
              id: 1,
              regions: [
                {
                  x: 400.6127424634778,
                  y: 400.4058872305141,
                  width: 200.05335417989937,
                  height: 200.95522388059703,
                },
              ],
              comment: "test100",
              user: "",
              created: "2023-05-09T23:26:47.905Z",
            },
          ],
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return <button onClick={ann}>Annotate</button>;
};

// POST uploadKey
// - generate upload key
// POST staging
// - upload file against key
// POST spotdifference
// - upload data to db with file references

const UploadFiles = () => {
  const fileHandler = (e) => {
    const f: File = e.target.files[0];
    const name = encodeURIComponent(f.name);

    axios
      .request({
        url: "http://localhost:3000/api/job/uploadkey",
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken.id_token}`,
        },
      })
      .then(function (response) {
        console.log("upload key/", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /**
     *{"url":"https://s3.ap-southeast-2.amazonaws.com/staging-be-plans","fields":{"key":"job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8/undefined","bucket":"staging-be-plans","X-Amz-Algorithm":"AWS4-HMAC-SHA256","X-Amz-Credential":"ASIA5UTWJYLEFA3TS2OH/20230530/ap-southeast-2/s3/aws4_request","X-Amz-Date":"20230530T005401Z","X-Amz-Security-Token":"IQoJb3JpZ2luX2VjEEkaDmFwLXNvdXRoZWFzdC0yIkgwRgIhALagXSnJwx8ONNkD0uR2+3Wn/+JM3mpbjf9CFc2uMJpcAiEAw/ucVHudzTv/XsULRrBbVXpV65yYIhm0l/h/vSlN3BIqpwMIgv//////////ARACGgw5Mzc2MjQ3MTU5NzYiDH1L0ltmjbOsqhQc+ir7AtpIe+ve80kM52jAWowDGM7g7gszh3FHB1OrslXDl8QW9pdNGm+s91VMYc5Tc2b0W9rpq7hGiu0qu2d0UrbY2gLmGm265J0h0Hr31w303wrurr5pgi2wLqBfWoToak+uY+gDLmakLo2nUW2UGNKz4FEt6Jz1gOtYDVbATmjF/chcnmpHBaLaum03MUft8m7GWulSXBUoHQ0MIhaAO8P1xYd4CWh/UhSEAHbmp9BfMOQkKpWk6GLROt2yTpsiEmOYjXGkjbDuiTCy/E+WRub1w9TttGoi8BcPQAiDR0KXzCyHW1jo832/y9VBSZHmU/08sxFl6g6qRkq1kjS8JeCPf5F5KgigYwulkA6RtRXJyNULtWC4BQH3+TKiqeA/TX4tr3BjoAneCu7I/LgSiipIctyEk97Pd1GcV6GP0GywfrABvURk+VAupsJdqatENjDJ67GkGvJIE727mr2g6FSRiuAeM7wWp/YQz58OKiDJoLJTW67OLujxm64ifgMwqpHVowY6nAGUkgv6+j7yF7T0b73jHA5HIqhDFVylkPMqsexIlSFSXpp/U+1nM2so9Jlm6qqM8jy40Q3LbNe/hdGL2lDXisUeIaXteTLE79+UGgptNFDs50dn8bGfD6dEtR9IgAQM0Q1pH0nTaP/MgxkLPhAbMVYPnYaYUVV/5x821QWiBkVliFlNGnHCgIXNGFfXsNs15n3+Yk27CMwwvFInG7w=","Policy":"eyJleHBpcmF0aW9uIjoiMjAyMy0wNS0zMFQwMTo1NDowMVoiLCJjb25kaXRpb25zIjpbeyJrZXkiOiJqb2I6Nzc3ZWE0YzAtZmU4NC0xMWVkLWFjMGQtZGYwZmMwYzE1YmU4L3VuZGVmaW5lZCJ9LHsiYnVja2V0Ijoic3RhZ2luZy1iZS1wbGFucyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFTSUE1VVRXSllMRUZBM1RTMk9ILzIwMjMwNTMwL2FwLXNvdXRoZWFzdC0yL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjMwNTMwVDAwNTQwMVoifSx7IlgtQW16LVNlY3VyaXR5LVRva2VuIjoiSVFvSmIzSnBaMmx1WDJWakVFa2FEbUZ3TFhOdmRYUm9aV0Z6ZEMweUlrZ3dSZ0loQUxhZ1hTbkp3eDhPTk5rRDB1UjIrM1duLytKTTNtcGJqZjlDRmMydU1KcGNBaUVBdy91Y1ZIdWR6VHYvWHNVTFJyQmJWWHBWNjV5WUlobTBsL2gvdlNsTjNCSXFwd01JZ3YvLy8vLy8vLy8vQVJBQ0dndzVNemMyTWpRM01UVTVOellpREgxTDBsdG1qYk9zcWhRYytpcjdBdHBJZSt2ZTgwa001MmpBV293REdNN2c3Z3N6aDNGSEIxT3JzbFhEbDhRVzlwZE5HbStzOTFWTVljNVRjMmIwVzlycHE3aEdpdTBxdTJkMFVyYlkyZ0xtR20yNjVKMGgwSHIzMXczMDN3cnVycjVwZ2kyd0xxQmZXb1RvYWsrdVkrZ0RMbWFrTG8yblVXMlVHTkt6NEZFdDZKejFnT3RZRFZiQVRtakYvY2hjbm1wSEJhTGF1bTAzTVVmdDhtN0dXdWxTWEJVb0hRME1JaGFBTzhQMXhZZDRDV2gvVWhTRUFIYm1wOUJmTU9Ra0twV2s2R0xST3QyeVRwc2lFbU9ZalhHa2piRHVpVEN5L0UrV1J1YjF3OVR0dEdvaThCY1BRQWlEUjBLWHpDeUhXMWpvODMyL3k5VkJTWkhtVS8wOHN4Rmw2ZzZxUmtxMWtqUzhKZUNQZjVGNUtnaWdZd3Vsa0E2UnRSWEp5TlVMdFdDNEJRSDMrVEtpcWVBL1RYNHRyM0Jqb0FuZUN1N0kvTGdTaWlwSWN0eUVrOTdQZDFHY1Y2R1AwR3l3ZnJBQnZVUmsrVkF1cHNKZHFhdEVOakRKNjdHa0d2SklFNzI3bXIyZzZGU1JpdUFlTTd3V3AvWVF6NThPS2lESm9MSlRXNjdPTHVqeG02NGlmZ013cXBIVm93WTZuQUdVa2d2NitqN3lGN1QwYjczakhBNUhJcWhERlZ5bGtQTXFzZXhJbFNGU1hwcC9VKzFuTTJzbzlKbG02cXFNOGp5NDBRM0xiTmUvaGRHTDJsRFhpc1VlSWFYdGVUTEU3OStVR2dwdE5GRHM1MGRuOGJHZkQ2ZEV0UjlJZ0FRTTBRMXBIMG5UYVAvTWd4a0xQaEFiTVZZUG5ZYVlVVlYvNXg4MjFRV2lCa1ZsaUZsTkduSENnSVhOR0ZmWHNOczE1bjMrWWsyN0NNd3d2RkluRzd3PSJ9XX0=","X-Amz-Signature":"ccbad9bde87e50abf367e73b928bec502449f705888202540df81a8b27212987"},"id":"job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8"}
}
     * 
     */

  const upload = () => {
    // const jobId = `job:${uuidv1()}`;

    axios

        .request({
        url: "http://localhost:3000/api/job/spotdifference",
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken.id_token}`,
        },
        data:{
            jobName: "API TEST",
            id: "job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8",
            organizationId: "organization:efb41bb0-9a54-11ea-825c-dd30ef2a5485",
            originalFileKey1:
              "job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8/2022-09-07T22%2059%2018.902Z_original.pdf",
            originalFileKey2:
              "job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8/2022-09-07T22%2059%2018.902Z_variation.pdf",
            url1: "https://s3.ap-southeast-2.amazonaws.com/staging-be-plans/job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8",
            url2: "https://s3.ap-southeast-2.amazonaws.com/staging-be-plans/job:777ea4c0-fe84-11ed-ac0d-df0fc0c15be8",
            pagesToCompare: [{ original: 1, variation: 1 }],
        }
      })
      .then(function (response) {
        console.log('Upload / ',response);
      })
      .catch(function (error) {
        console.log('Upload / ',error);
      });
  };

  //   const fileHandler = (e) => {};

  return (
    <>
      <input type="file" onChange={fileHandler} />
      <button onClick={upload}>Upload</button>
    </>
  );
};

export const App = () => {
  return (
    <div>
      <LoginButton />

      <JobsButton />
      <AnnotationButton />
      <UploadFiles />
    </div>
  );
};
