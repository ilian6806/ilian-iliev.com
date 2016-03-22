<?php 

$name = trim(htmlspecialchars($_POST['name'])); 
$from = trim(htmlspecialchars($_POST['email'])); 
$subject = trim(htmlspecialchars($_POST['subject'])); 
$message = trim(htmlspecialchars($_POST['message'])); 
$to = 'ilian6806@abv.bg'; 

$headers = array(); 
$headers[] = "MIME-Version: 1.0"; 
$headers[] = "Content-type: text/plain; charset=utf-8";
$headers[] = "From: {$name} <{$from}>"; 
$headers[] = "Reply-To: <{$from}>"; 
$headers[] = 'X-Mailer: PHP/'.phpversion(); 

mail($to, $subject, $message, implode("\r\n", $headers)); 

?>