/* 
Example action for emailing ORNL DAAC Staff at the specified point in the workflow using a custom template
*/
const getCustomEmailDaacTemplate = (params, envUrl) => {
    const text = `Hello ${params.user.name},\n\nThe submission ${params.eventMessage.submission_name} has reached the email DAAC step of the ${params.eventMessage.workflow_name}.`;
    const html = `
      <html>
         <body>
             <style>td h1 { margin: 0; padding: 0; font-size: 22px; }</style>
             <table border="0" cellpadding="10" cellspacing="0" style="width:100%">
               <tr style="width:100%;background:#f8f8f8">
                   <td>
                     <table>
                       <tr>
                         <td width="60"><img src = "${envUrl}/dashboard/images/app/src/assets/images/nasa-logo.78fcba4d9325e8ac5a2e15699d035ee0.svg"></td>
                         <td><h4>Earthdata Pub</h4></td>
                       </tr>
                     </table>
                   </td>
                   <td></td>
               </tr>
               <tr>
                 <td colspan="2" style="padding:20px;">
                   <h1>Hello ${params.user.name},</h1><br><br>
                   <p>The submission ${params.eventMessage.submission_name} has reached the email DAAC step of the ${params.eventMessage.workflow_name}.</p>
                   <br><br>
                   <p><a style="text-align: left;" href="${envUrl}/dashboard" aria-label="Visit Earthdata Pub Dashboard">${envUrl}/dashboard</a></p>
                 </td>
               </tr>
            </table>
         </body>
       </html> 
      `;
    return [text, html];
  };


async function execute({ submission, DatabaseUtil, MessageUtil }) {
    let users = await DatabaseUtil.user.findAll({ group_id:'89816689-5375-4c81-a30c-bf6ed12d30fb', role_id:'a5b4947a-67d2-434e-9889-59c2fad39676', requested_fields: ['id', 'name', 'email'] });

    emailProps = {
      submission_id: submission.id,
      submission_name: submission.name,
      workflow_name: submission.workflow_name,
      daac_name: submission.daac_name,
    };

    MessageUtil.sendEmail(users, emailProps, getCustomEmailDaacTemplate);
    
}

module.exports.execute = execute;