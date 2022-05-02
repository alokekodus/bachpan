<?php
require("vendor/mail/class.phpmailer.php");
$mail = new PHPMailer();

$mail->IsSMTP();
$mail->Mailer = "smtp";

$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = true;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username = "checkermail102@gmail.com";
$mail->Password = "P@55w0rd123";

$mail->AddAddress("alok.deka@ekodus.com", "Support");
$mail->SetFrom($_POST["email"], $_POST["name"]);
$mail->AddReplyTo($_POST["email"], $_POST["name"]);

$mail->IsHTML(true);
$MESSAGE_BODY = "Admission for: ".check_input($_POST["admission_for"])."<br/>"; 
$MESSAGE_BODY .= "Parents name: ".check_input($_POST["parents_name"])."<br/>"; 
$MESSAGE_BODY .= "Student name: ".check_input($_POST["students_name"])."<br/>"; 
$MESSAGE_BODY .= "Email: ".check_input($_POST["email"])."<br/>"; 
$MESSAGE_BODY .= "Phone Number: ".check_input($_POST["phone"])."<br/>"; 
$MESSAGE_BODY .= "Address: ".check_input($_POST["address"])."<br/>"; 
$MESSAGE_BODY .= "Message: ".check_input($_POST["message"])."<br/>";


$mail->Subject = "Admission Enquiry Form";
$mail->Body = $MESSAGE_BODY;


if(!$mail->Send())
{
   $return['msgType']=false;
   $return['msg']=$mail->ErrorInfo;
   $return['icon']="error";
   $return['title']="Oops...";
   echo json_encode($return);
}else{
   $return['msgType']=true;
   $return['msg']="Message has been sent";
   $return['icon']="success";
   $return['title']="Done";
   
   echo json_encode($return);
}

function check_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
